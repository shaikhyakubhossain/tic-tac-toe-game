type PropsType = {
    
}

export default function Grid(props: PropsType) {

    const gridBlockTW = "w-1/3 h-1/3"
    
    return (
        <div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
            <div className={`${gridBlockTW}`}></div>
        </div>
    )
}