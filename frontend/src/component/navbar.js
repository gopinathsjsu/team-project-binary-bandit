import { Navbar, Nav } from 'rsuite';
import { forwardRef } from 'react';
import AdminIcon from '@rsuite/icons/Admin';
import HomeIcon from '@rsuite/icons/legacy/Home';
import Cookies from 'js-cookie';

import { Link } from 'react-router-dom';

const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));




const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const admin = Cookies.get('admin');


  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("admin");
  }
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">FitnessLand</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        
        {!user && !admin && (<Nav.Item as={NavLink} href="/" eventKey="Home" icon={<HomeIcon />}> Home</Nav.Item>)}

        {user && user.role === 'Member' && (<>
          <Nav.Item as={NavLink} href="/" eventKey="Home" icon={<HomeIcon />}> Home </Nav.Item>
          <Nav.Item as={NavLink} href="/class-enroll" eventKey="class-enroll"  >Enroll</Nav.Item>
          <Nav.Item as={NavLink} href="/log-activity" eventKey="log-activity" >Log Activity</Nav.Item>
          {/* <Nav.Item as={NavLink} href="/user-dashboard" eventKey="user-dashboard" >View Hour Spent</Nav.Item> */}

        </>)}
        {admin && (<>
          <Nav.Item as={NavLink} href="/admin-dashboard" eventKey="admin-dashboard" icon={<HomeIcon />}>Home</Nav.Item>
          <Nav.Item as={NavLink} href="/user" eventKey="user" >User</Nav.Item>
          <Nav.Item as={NavLink} href="/gym" eventKey="gym" >Gym</Nav.Item>
          <Nav.Item as={NavLink} href="/membership" eventKey="membership">Membership</Nav.Item>

        </>
        )}
        {user && user.role === 'Employee' &&
          (<>
            <Nav.Item as={NavLink} href="/subscription" eventKey="subscription" icon={<HomeIcon />}>Subscription</Nav.Item>
            <Nav.Item as={NavLink} href="/checkin" eventKey="checkin" >Checkin</Nav.Item>
            <Nav.Item as={NavLink} href="/checkout" eventKey="checkout" >Checkout</Nav.Item>
            <Nav.Item as={NavLink} href="/class" eventKey="class" >Class</Nav.Item>
          </>)
        }

        {/* <Nav.Menu title="About">
          <Nav.Item as={NavLink} href="/" eventKey="4">Company</Nav.Item>
          <Nav.Item as={NavLink} href="/" eventKey="5">Team</Nav.Item>
          <Nav.Item as={NavLink} href="/" eventKey="6">Contact</Nav.Item>
        </Nav.Menu> */}
      </Nav>
      <Nav pullRight>
        {user || admin ? (
          <Nav.Menu icon={<AdminIcon />} title={admin ? "Admin" : user.name}>
            <Nav.Item as={NavLink} href="/login" eventKey="logout" onClick={handleLogout}>logout</Nav.Item>
          </Nav.Menu>
        ) : (
          <Nav.Menu icon={<AdminIcon />} title="Login">
            <Nav.Item as={NavLink} href="/admin/login" eventKey="adminLogin">Admin</Nav.Item>
            <Nav.Item as={NavLink} href="/login" eventKey="login">Other</Nav.Item>
          </Nav.Menu>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;