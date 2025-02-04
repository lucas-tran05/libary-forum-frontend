import React, { useState, useEffect } from 'react';
import SiderComponent from '../../../../shared/components/sidebar';
import Footer from '../../../../shared/components/footer';
import FloatAI from '../../floatAI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemsSibar } from '../valueSidbar';
import { Layout } from 'antd';
const { Content } = Layout;

const OnlySideBarAndFooter = ({ children }) => {
    // Get the sidebar state from localStorage and ensure it's parsed as a boolean
    const stateSibar = localStorage.getItem('stateSibar');
    const [collapsed, setCollapsed] = useState(stateSibar ? JSON.parse(stateSibar) : false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the sidebar items using dispatch and navigate
    const menuItems = itemsSibar(dispatch, navigate);

    useEffect(() => {
        // Save the sidebar state to localStorage whenever it changes
        localStorage.setItem('stateSibar', JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <SiderComponent collapsed={collapsed} onCollapse={setCollapsed} items={menuItems} />

            {/* Content */}
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.3s' }}>
                {/* Main Content */}
                <Content
                    style={{
                        padding: '16px',
                        background: '#fff',
                    }}
                >
                    {children}
                </Content>

                {/* Footer */}
                <Layout.Footer
                    style={{
                        textAlign: 'center',
                        background: '#fff',
                        paddingTop: 16,
                    }}
                >
                    <Footer />
                </Layout.Footer>
            </Layout>
            <FloatAI />
        </Layout>
    );
};

export default OnlySideBarAndFooter;
