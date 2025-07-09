

import React, { type FC } from 'react'
import styles from './ModalTransformating.module.scss'
import { FaRegChessBishop, FaRegChessKnight, FaRegChessQueen, FaRegChessRook } from 'react-icons/fa6'

interface ModalTransformatingProps{
    onClick: (pieceName: string) => void
}

export const ModalTransformating: FC<ModalTransformatingProps> = ({onClick}) => {
  return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            
            <div onClick={() => onClick('rook')} className={styles.modalItem}><FaRegChessRook size={100}/></div>
            <div onClick={() => onClick('bishop')} className={styles.modalItem}><FaRegChessBishop size={100}/></div>
            <div onClick={() => onClick('knight')} className={styles.modalItem}><FaRegChessKnight size={100}/></div>
            <div onClick={() => onClick('queen')} className={styles.modalItem}><FaRegChessQueen size={100}/></div>
        </div>
    </div>
  )
}
