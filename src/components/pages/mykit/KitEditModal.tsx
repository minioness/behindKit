import { useEffect, useState } from "react";

import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";

import styles from './KitEditModal.module.css'

interface KitEditModalProps {
    kit: Kit; 
    userId: string;
    onClose: () => void;   // 모달 닫기 함수
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


export default function KitEditModal({
    kit,
    userId,
    onClose,
    onUpdated,
}: KitEditModalProps) {


    const [kitName, setKitName] = useState(kit.kitName);
    const [kitDescription, setKitDescription] = useState(kit.kitDescription);
    const [templates, setTemplates] = useState<TemplateItem[]>([]);
    const [selectedTemplates, setSelectedTemplates] = useState<number[]>(
        kit.templates.map(t => t.id)
    );


    // 구매한 탬플릿 다시 불러오기
    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, 'orders'), where('userId', '==', userId));
            const snapshot = await getDocs(q);

            const allItems = snapshot.docs.flatMap(doc => doc.data().items) as TemplateItem[] ;

            const uniqueItems = Array.from(
                new Map(allItems.map(item => [item.id, item])).values()
            );

            setTemplates(uniqueItems);
        }

        fetchOrders();

    }, [userId])


    const toggleTemplate = (id: number) => {
        setSelectedTemplates(prev =>
        prev.includes(id)
            ? prev.filter(tid => tid !== id)
            : [...prev, id]
        );
    };

    const handleUpdate = async () => {
        if (!kitName.trim()) {
            alert('키트 이름을 입력해주세요!');
            return;
        }
        if (selectedTemplates.length === 0) {
            alert('템플릿을 선택해주세요!');
            return;
        }

        const selectedData = templates.filter(t => selectedTemplates.includes(t.id));

        await updateDoc(doc(db, 'kits', kit.id), {
            kitName: kitName.trim(),
            kitDescription: kitDescription.trim(),
            templates: selectedData,
            updatedAt: serverTimestamp(),
        });

        alert('키트가 수정되었습니다!');
        onUpdated();
        onClose();
    };



   
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>키트 수정하기</h2>

                <h3 className={styles.kitName}>키트 이름</h3>
                <input
                className={styles.kitNameInput}
                type="text"
                placeholder="키트 이름을 작성해 주세요"
                value={kitName}
                onChange={e => setKitName(e.target.value)}
                />

                <h3 className={styles.kitDescription}>키트 설명</h3>
                <input
                className={styles.kitDescriptionInput}
                type="text"
                placeholder="키트에 대한 설명을 작성해주세요"
                value={kitDescription}
                onChange={e => setKitDescription(e.target.value)}
                maxLength={50}
                />

                <h3 className={styles.listTitle}>내가 구매한 템플릿</h3>

                <div className={styles.templateList}>
                    {templates.length > 0 ? (
                        templates.map(t => (
                        <label key={t.id} className={styles.checkboxItem}>
                            <input
                            type="checkbox"
                            checked={selectedTemplates.includes(t.id)}
                            onChange={() => toggleTemplate(t.id)}
                            />
                            <img src={t.thumbnail} alt={t.title} width="40" />
                            {t.title}
                        </label>
                        ))
                    ) : (
                        <p className={styles.emptyMessage}>구매한 템플릿이 없습니다.</p>
                    )}
                </div>

                <div className={styles.modalButtons}>
                    <button onClick={onClose} className={styles.cancelButton}>취소</button>
                    <button onClick={handleUpdate} className={styles.createButton}>수정하기</button>
                </div>
            </div>

        </div>

    )

}