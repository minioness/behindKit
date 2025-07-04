import { Timestamp } from 'firebase/firestore';

export const formatDate = (ts: Timestamp) => {
    const d = ts.toDate();
    
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');


    return `${yyyy}.${mm}.${dd}`;
}