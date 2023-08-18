import "../../Pages/Inbox/css/mail.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from "../../img/logo2.png";
import Aside from "../../Components/Aside";
const singlemail=()=>{

    return (
    
<> 
<div style={{clear: "both"}}></div>
     <div className="container-fluid">
        <div className="row">
            <div className="col-lg-4">
              <Aside/>
            </div>
    <div className="col-lg-8">
            <div className="single-mail">
    <Container className="p-0">
      <Row className="top-bar">
        <Col md={4} >
            <img src={logo} alt="" />
        </Col>
        <Col md={8}>
        <span className="top-title">
        Appointment Confirmation
        </span>
        </Col>
      </Row>
      <Row className="content">
        <Col md={12}  >
           <span>
            sender username
           </span>
           <span>
             job title
           </span>
           <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloremque rerum, alias provident consequatur commodi ullam culpa cupiditate veritatis iusto dolores placeat quas rem veniam consequuntur accusamus consectetur facilis sit dolorem at minima. Repudiandae similique iusto maiores excepturi blanditiis soluta?
           </p>
           
        </Col>
      </Row>
      <Row className="top-bar">
        <Col md={4} >
            <img src={logo} alt="" />
        </Col>
        <Col md={8}>
            <ul className="social-footer">
                <li>facebook</li>
                <li>twitter</li>
                <li>google</li>
            </ul>
        </Col>
      </Row>
     
    </Container>
    </div>
    </div>
        </div>
     </div>
 
  
    
     </>
    
    )
}

export default singlemail;