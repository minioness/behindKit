import { useEffect, useState } from 'react';

import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase';

import styles from './KitDetailModal.module.css';
import { FiTrash2 } from 'react-icons/fi';
import AddTemplateModal from './AddTemplateModal';

interface KitDetailModalProps {
  kit: Kit;
  userId: string;
  onClose: () => void; // 모달 닫기 함수
  onUpdated: () => void;
}

interface Kit {
  id: string;
  kitName: string;
  kitDescription: string;
  templates: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    fileUrl: string;
  }[];
}

interface TemplateItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  fileUrl: string;
}

export default function KitDetailModal({ kit, userId, onClose, onUpdated }: KitDetailModalProps) {
  const [kitName, setKitName] = useState(kit.kitName);
  const [kitDescription, setKitDescription] = useState(kit.kitDescription);

  const [templates, setTemplates] = useState<TemplateItem[]>(kit.templates);
  const [allTemplates, setAllTemplates] = useState<TemplateItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // 구매한 탬플릿 내역 불러오기
    const fetchAllTemplates = async () => {
      const q = query(collection(db, 'orders'), where('userId', '==', userId));
      const data = await getDocs(q);

      const allItems = data.docs.flatMap((doc) => doc.data().items) as TemplateItem[];
      const uniqueItems = Array.from(new Map(allItems.map((item) => [item.id, item])).values());
      setAllTemplates(uniqueItems);
    };

    fetchAllTemplates();
  }, [userId]);

  const handleRemoveTemplate = (id: number) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTemplates = (selected: TemplateItem[]) => {
    const newTemplates = selected.filter((t) => !templates.some((existing) => existing.id === t.id));
    setTemplates((prev) => [...prev, ...newTemplates]);
  };

  const handleSave = async () => {
    if (!kitName.trim()) {
      alert('키트 이름을 입력해주세요!');
      return;
    }

    if (templates.length === 0) {
      alert('템플릿을 최소 하나 선택해주세요!');
      return;
    }

    await updateDoc(doc(db, 'kits', kit.id), {
      kitName: kitName.trim(),
      kitDescription: kitDescription.trim(),
      templates,
      updatedAt: serverTimestamp(),
    });

    alert('키트가 수정되었습니다!');
    onUpdated();
    onClose();
  };

  const handleDelete = async () => {
    if (!window.confirm('정말로 삭제할까요?')) return;

    await deleteDoc(doc(db, 'kits', kit.id));
    alert('키트가 삭제되었습니다.');
    onUpdated();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{kit.kitName}</h2>

        <h3 className={styles.kitName}>키트 이름</h3>
        <input
          className={styles.kitNameInput}
          type="text"
          placeholder="예) "
          value={kitName}
          onChange={(e) => setKitName(e.target.value)}
        />

        <h3 className={styles.kitDescription}>키트 설명</h3>
        <input
          className={styles.kitDescriptionInput}
          type="text"
          placeholder="키트에 대한 설명을 작성해주세요"
          value={kitDescription}
          onChange={(e) => setKitDescription(e.target.value)}
          maxLength={50}
        />

        <div className={styles.listTitle}>
          <h3>템플릿 리스트</h3>

          <button onClick={() => setIsAddModalOpen(true)} className={styles.templateAddBtn}>
            템플릿 추가
          </button>
        </div>

        <div className={styles.templateList}>
          {templates.map((t) => (
            <div key={t.id} className={styles.templateItem}>
              <div className={styles.info}>
                <img src={t.thumbnail} alt={t.title} />
                <span>{t.title}</span>
              </div>
              <div className={styles.btnGroup}>
                <button onClick={() => handleRemoveTemplate(t.id)}>
                  <FiTrash2 size={18} className={styles.icon} />
                </button>
                <a href={t.fileUrl} download="my-template.pdf">
                  <img src="/assets/img/button/downloadIcon.png" alt="다운로드 아이콘" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {isAddModalOpen && (
          <AddTemplateModal
            allTemplates={allTemplates}
            currentTemplates={templates}
            onAdd={handleAddTemplates}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}

        <div className={styles.modalButtons}>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            삭제하기
          </button>
          <button onClick={handleSave} className={styles.updateBtn}>
            수정하기
          </button>
          <button onClick={onClose} className={styles.closeBtn}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
