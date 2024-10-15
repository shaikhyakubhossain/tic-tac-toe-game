import styles from "./grid.module.scss"

type PropsType = {
    
}

export default function Grid(props: PropsType) {

    const gridBlockTW: string = `w-20 h-20 bg-gray-300 border border-black`;
    
    return (
        <div className={`${styles.mainContainer} w-60 mx-auto grid`}>
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