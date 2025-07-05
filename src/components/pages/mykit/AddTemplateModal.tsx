import { useState } from "react";

import styles from './AddTemplateModal.module.css'

interface TemplateItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  fileUrl: string;
}

interface AddTemplateModalProps {
  allTemplates: TemplateItem[];   // 구매한 전체 템플릿
  currentTemplates: TemplateItem[]; // 현재 키트에 이미 포함된 템플릿
  onAdd: (selected: TemplateItem[]) => void; // 선택된 템플릿 배열 부모로 전달
  onClose: () => void; // 모달 닫기
}

export default function AddTemplateModal({
  allTemplates,
  currentTemplates,
  onAdd,
  onClose,
}: AddTemplateModalProps) {

    // 선택된 템플릿  ID 관리
    const [selectedIds, setSelectedIds] = useState<number[]>([]);


    // 이미 포함된 템플릿 제외한 선택 후보
    const selectableTemplates = allTemplates.filter(
        t => !currentTemplates.some(existing => existing.id === t.id)
    );


    const toggleSelect = (id:number) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
        );
    };

    const handleAdd = () => {
        const selectedTemplates = selectableTemplates.filter(t => 
            selectedIds.includes(t.id)
        );

        if (selectedTemplates.length === 0) {
            alert("템플릿을 선택해주세요");
            return;
        }

        onAdd(selectedTemplates);
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>

                <h2>추가할 템플릿 리스트를 선택하세요</h2>

                
                <div className={styles.templateList}>
                    {selectableTemplates.length > 0 ? (
                        <div className={styles.templateList}>
                            {selectableTemplates.map(t => (
                            <label key={t.id} className={styles.checkboxItem}>
                                <input
                                type="checkbox"
                                checked={selectedIds.includes(t.id)}
                                onChange={() => toggleSelect(t.id)}
                                />
                                <img src={t.thumbnail} alt={t.title} />
                                <span>{t.title}</span>
                            </label>
                            ))}
                        </div>
                        ) : (
                        <p>추가할 수 있는 템플릿이 없습니다</p>
                        )}

                </div>

                <div className={styles.modalButtons}>
                    <button onClick={onClose} className={styles.closeBtn} >닫기</button>
                    <button onClick={handleAdd} className={styles.AddBtn}>추가하기</button>

                </div>

            </div>

        </div>
    )
}