export default function And() {

    const isOnline  = true;
    const temperature = 15;

    return ( <>
        { isOnline && <p>🟢 Қолданушы онлайн </p> || <p>🔴 Қолданушы офлайн</p> }

        <p>  {temperature > 30 ? 'Ыстыкк' : temperature > 15 ? "жылы" : "суык" } </p>
    </>
)
}  