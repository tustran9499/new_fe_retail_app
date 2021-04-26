import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, ListGroup, Badge } from 'react-bootstrap';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const NotificationSummary = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { className } = props;

  /*
   * Setting show/hide Notification
   */
  const [showNotification, setShowNotification] = React.useState<boolean>(
    false
  );

  //const notiStore = React.useContext(NotificationStoreContext);

  return (
    <>
      <div className={`item box-noti ${className ? className : ''}`}>
        <Button
          variant="link"
          className="box-noti-link"
          onClick={() => setShowNotification(!showNotification)}
        >
          <i className="ico ico-noti"></i>
          <Badge variant="light">3</Badge> 
        </Button>
        {showNotification && (
          <>
            <ListGroup as="ul" className="box-noti-list">
                <ListGroup.Item
                  as="li"
                >
                </ListGroup.Item>
              ))
                <ListGroup.Item className="buttons">
                  <Button
                  >
                    <span>Load more</span>
                    <i className="ico ico-next"></i>
                  </Button>
                </ListGroup.Item>
              )
            </ListGroup>
          </>
        )}
      </div>
    </>
  );
};

export default observer(NotificationSummary);
