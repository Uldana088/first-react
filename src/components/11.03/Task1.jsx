export default function And() {

    const isAdmin = true;
    const  isSubscribed = false;
    
    return ( <>
        { isAdmin && <p>you are admin</p> }
        { isSubscribed && <p>"Сіз Premium қолданушысыз</p> || <p>Қарапайым қолданушы</p> }
    </>
    )
    }