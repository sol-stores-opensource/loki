import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import s from '../styles/modal.module.scss';
import {classNames} from '../utils';

export const Modal = ({children, closeModal, alignTop}) => {
  const elRef = useRef(null as any);

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  const handleClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot?.appendChild(elRef.current);

    return () => {
      modalRoot?.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className={classNames(s.bg, alignTop && s.align_top)}
        onClick={closeModal}
      >
        <div onClick={handleClick}>{children}</div>
      </motion.div>
    </AnimatePresence>,

    elRef.current
  );
};
