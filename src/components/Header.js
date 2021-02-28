import React from 'react'
import './Header.css'
import Nav from 'react-bootstrap/Nav'

export default function Header() {
    return (
        <div>
            <Nav className="nav">
                <Nav.Item>
                    <Nav.Link href="/">Explore</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/favorites">Favorites</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/search">Search</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
