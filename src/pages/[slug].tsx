import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { app } from '../../db/firebase';


export default function Redirect() {
    const db = getFirestore(app);
    const router = useRouter();
    const { shortURL } = router.query;

    useEffect(() => {
        const fetchUrl = async () => {
            const q = query(collection(db, 'upload'), where('shortURL', '==', shortURL));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                window.location.href = doc.data().fileURL; // Redirect to the long URL
            } else {
                router.push('/'); // Redirect to home if shortURL is not found
            }
        };

        if (shortURL) {
            fetchUrl();
        }
    }, [shortURL, router]);

    return null;
}
