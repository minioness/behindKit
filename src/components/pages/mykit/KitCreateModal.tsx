import { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";

import styles from './KitCreateModal.module.css'



//부모에서 전달받는 props 타입 정의
interface KitCreateModalProps {
  userId: string;
  onClose: () => void;   // 모달 닫기 함수
  onCreated: () => void; // 저장 완료 후 부모에서 실행할 콜백(fetchKits)
}


interface TemplateItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  fileUrl: string;
}


export default function KitCreateModal({
  userId,
  onClose,
  onCreated,
}: KitCreateModalProps) {

    // 입력할 키트 이름
    const [kitName, setKitName] = useState('');
    const [kitDescription, setKitDescription] = useState('');


    // firestore에서 가져온 구매 템플릿 리스트
    const [templates, setTemplates] = useState<TemplateItem[]>([]);

    // 체크박스로 선택된 템플릿 ID 목록
    const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);


    // 모달이 열리면 실행: Firestore에서 구매내역 가져오기
    useEffect(() => {
        const fetchOrders = async () => {
            const q = query(collection(db, 'orders'), where('userId', '==', userId))
            const snapshot = await getDocs(q);
            

            // 모든 주문의 items 배열을 하나로 합침
            const allItems = snapshot.docs.flatMap(doc => doc.data().items) as TemplateItem[];


            // id로 중복 제거
            const uniqueItems = Array.from(
                new Map(allItems.map((item) => [item.id, item])).values()
            );

            setTemplates(uniqueItems); // 상태에 저장
        }
        
        fetchOrders();

    }, [userId]);


    const toggleTemplate = (id: number) => {
        setSelectedTemplates(prev => 
            prev.includes(id)
            ? prev.filter(tid => tid !== id)
            : [...prev, id]
        );
    };

    
    const handleCreate = async () => {
        if (!kitName.trim()) {
            alert('키트 이름을 입력해주세요!');
            return;
        }
        if (selectedTemplates.length === 0) {
            alert('템플릿을 선택해주세요!');
            return;
        }
        
        const selectedData = templates.filter(t => selectedTemplates.includes(t.id));
        
        await addDoc(collection(db, 'kits'), {
            uid: userId,
            kitName: kitName.trim(),
            kitDescription: kitDescription.trim(),
            templates: selectedData,
            createAt: serverTimestamp(),
        });

        alert('키트가 생성되었습니다!');
        onCreated();
        onClose();

    }


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>새 키트 만들기</h2>

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
                    <button onClick={handleCreate} className={styles.createButton}>생성하기</button>
                </div>
            </div>

        </div>

    )

}