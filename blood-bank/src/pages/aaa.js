import React, { useState } from 'react';
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';

export default function App() {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <>
      <MDBBtn tag='a' onClick={toggleShow}>
        Link
      </MDBBtn>
      <MDBBtn onClick={toggleShow}>Button</MDBBtn>
      <MDBCollapse show={showShow}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </MDBCollapse>
    </>
  );
}