import React from 'react';
import {classNames} from '../../utils';
import s from '../../styles/onboarding-header.module.scss';

export const Header = ({
  title,
  stepNumber,
  totalSteps,
  setPage,
  color,
  logo,
  resetTrigger,
}: {
  title: string;
  stepNumber: number;
  totalSteps: number;
  setPage: (arg: number) => void;
  color: string;
  logo: string;
  resetTrigger: () => void;
}) => {
  return (
    <div className={s.header}>
      <img className={s.logo} src={logo} onClick={resetTrigger} />
      <h1 className={s.headline}>{title}</h1>
      <div className={s.stepContainer}>
        <div className={classNames(s.step_count)}>
          <span>Step {stepNumber + 1}</span>/{totalSteps}
        </div>
        <div className={s.line_container}>
          <span className={s.line} />
          <span
            className={s.fill_line}
            style={
              {
                width: `${((stepNumber + 1) / totalSteps) * 100}%`,
                '--color': color,
              } as React.CSSProperties
            }
          />
        </div>
        {!!stepNumber && (
          <div onClick={() => setPage(0)} className={s.reset}>
            Start over
          </div>
        )}
      </div>
    </div>
  );
};
