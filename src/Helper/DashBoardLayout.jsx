'use client';

import DashBoard from '@/Helper/DashBoardNavigation';
import styles from '../CSS/DashboardLayout.module.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <DashBoard />
      </div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default DashboardLayout;