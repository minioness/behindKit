import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

import KitCreateModal from './KitCreateModal';
import KitDetailModal from './KitDetailModal';

import { FiTrash2 } from 'react-icons/fi';

import styles from './MyKit.module.css'


interface RouterProps {
  user: User;
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



export default function MyKit( {user}:RouterProps ) {

  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [DetailKit, setDetailKit] = useState<Kit | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);


  // kit 리스트 불러오는 함수
  const fetchKits = async () => {
    if (!user) return;

    const  q = query(collection(db, 'kits'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);


    const result =snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),

    })) as Kit[];

    setKits(result);
    setLoading(false);

  }

  useEffect(() => {
    fetchKits();
  }, [user]);




  const handleDelete = async (kitId: string) => {
    if (!confirm('정말 삭제할까요?')) return;

    await deleteDoc(doc(db, 'kits', kitId));

    alert('삭제 완료!');
    fetchKits();
  };




  return (
    <div className={styles.myKitPageContainer}>
      <div className={styles.title}>
        <Link to='/mypage'>
          <img src='/src/assets/img/button/backBtn.svg' alt='뒤로가기 화살표'/>
        </Link>
        <h1>My Kit</h1>
      </div>

      <div className={styles.createKitContainer}>
        <div className={styles.createKit}>
          <h2>나만의 업무 템플릿 키트를 만들어 보세요</h2>
          <p>목적별로 가장 많이 사용하는 템플릿을 묶어서 나만의 루틴 키트를 구성할 수 있어요</p>
          <button onClick={() => setIsModalOpen(true)}>
            <img src='/src/assets/img/button/newBtn.svg' alt='생성 이미지'/>
            키트 만들기
          </button>
        </div>
          
        <figure className={styles.myKitBoxImg}>
          <img src='/src/assets/img/myKitBoxImg.svg' alt='마이키트 박스 이미지'/>
        </figure>
      </div>

      {loading ? (
        <p>불러오는 중...</p>
      ) : kits.length > 0 ? (
        <div className={styles.kitList}>
          {kits.map(kit => (
            <div 
              key={kit.id} 
              className={styles.kitCard}
              onClick={() => {
                setDetailKit(kit);
                setIsDetailModalOpen(true);
              }}
            >
              {/* 썸네일 영역 */}
              <div className={styles.thumbnailWrapper}>
                {kit.templates.length > 0 ? (
                  <img src={kit.templates[0].thumbnail} alt={kit.kitName} />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
              </div>

              {/* Kit 정보 */}
              <div className={styles.kitInfo}>
                <h3>{kit.kitName}</h3>
                <p>{kit.kitDescription}</p>
                <div className={styles.btnGroup}>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(kit.id)
                  }}
                   className={styles.deleteBtn}
                  >
                    <FiTrash2 size={18}  className={styles.trashIcon}/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <img src='/src/assets/img/myKitEmpty.png' alt='빈 키트 이미지'/>
          <p>아직 만든 키트가 없어요</p>

        </div>
      )}

      {isModalOpen && user && (
        <KitCreateModal
          userId={user.uid}
          onClose={() => setIsModalOpen(false)}
          onCreated={fetchKits} // 저장 후 리스트 새로고침
        />
      )}

      {isDetailModalOpen && DetailKit && (
        <KitDetailModal
          userId={user.uid}  
          kit={DetailKit}
          onClose={() => setIsDetailModalOpen(false)}
          onUpdated={fetchKits}      
        />
      )}
    </div>
  );
}