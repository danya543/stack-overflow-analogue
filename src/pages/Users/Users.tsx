import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUsers } from '@/api/getUsers';
import { UserBase } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { Pagination } from '@/components/Pagination/Pagination';

import * as styles from './Users.module.scss';

export const UsersPage = () => {
  const [data, setData] = useState<UserBase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await getUsers({ page, limit: 15 });
      setData(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className={styles.container}>
      {loading && <Loader />}

      {!loading && data.length === 0 && <p>No users found.</p>}

      {!loading && data.length > 0 && (
        <>
          {data.map((user) => (
            <div
              key={user.id}
              onClick={() => navigate(`${user.id}`)}
              className={styles.user}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(`${user.id}`);
              }}
            >
              <p>Name: {user.username},</p>
              <p>Role: {user.role}</p>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};
