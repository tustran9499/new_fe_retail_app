import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { ActionBarDto } from '../../theme.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
  actions?: ActionBarDto[];
}

const ActionBar = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { className, actions = [] } = props;

  return (
    <>
      {actions?.length > 0 && (
        <div className={`action-bar ${className ?? ''}`}>
          {actions.map((item: ActionBarDto, index: number) => (
            <Button
              key={`action-bar-${index}`}
              variant={item.type}
              onClick={item.action}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default observer(ActionBar);
