import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentDate from '../CurrentDate';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle?: string;
  showCurrentDate: boolean;
}

const PageTitle = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    subTitle = '',
    showCurrentDate = true,
  } = props;

  return (
    <>
      <Container
        fluid
        className={`page-title-wrapper ${className ? className : ''}`}
        style={style}
      >
        <Row>
          <Col xs={12} md={7}>
            <h1 className="page-title">{title}</h1>
            {subTitle && <p className="page-subtitle">{subTitle}</p>}
          </Col>
          {showCurrentDate && (
            <Col xs={12} md={5}>
              <CurrentDate />
            </Col>
          )}
        </Row>
        {children}
      </Container>
    </>
  );
};

export default observer(PageTitle);
