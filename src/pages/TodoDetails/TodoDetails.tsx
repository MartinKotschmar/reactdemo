import React, { FC, useEffect, useMemo, useState } from "react";
import * as styles from "./TodoDetails.module.css";
import { Link, useLocation } from "react-router-dom";
import { fetchList } from "../../api/fetchList";
import { TodoListElementType } from "../../types/TodoListElements";
import { MutatingDots } from "react-loader-spinner";

const TodoDetails: FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<TodoListElementType>();
  const [detailsHeadline, setDetailsHeadline] = useState<string>("");

  const lastPathParam = useMemo(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    return pathSegments[pathSegments.length - 1];
  }, [location.pathname]);

  //url to get exact details data for single todo
  //checked state is static here, changes on list page doesnt impact api response
  useEffect(() => {
    setIsLoading(true);
    const fetchDetails = fetchList(
      `https://jsonplaceholder.typicode.com/todos/${lastPathParam}`,
    );
    fetchDetails
      .then((data) => {
        setIsLoading(false);
        setDetailsData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  }, [lastPathParam]);

  useEffect(() => {
    detailsData &&
      setDetailsHeadline(
        `ToDo Nr. ${detailsData.id}, User: ${detailsData.userId}`,
      );
  }, [detailsData]);

  return (
    <div className={styles.container}>
      <>
        {detailsData ? (
          <>
            <div>
              <h1 className={styles.headline}>{detailsHeadline}</h1>
            </div>
            <div className={styles.detailsContainer}>
              <div className={styles.detailsRow}>
                <span>userID:</span>
                <span>{detailsData?.userId}</span>
              </div>
              <div className={styles.detailsRow}>
                <span>ID:</span>
                <span>{detailsData?.id}</span>
              </div>
              <div className={styles.detailsRow}>
                <span>Titel:</span>
                <span>{detailsData?.title}</span>
              </div>
              <div className={styles.detailsRow}>
                <span>abgeschlossen (mglw. alter Status):</span>
                <span>{detailsData?.completed ? "Ja" : "Nein"}</span>
              </div>
            </div>
          </>
        ) : isLoading ? (
          <div className={styles.loading}>
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div>Error</div>
        )}
      </>
      <div className={styles.backLinkContainer}>
        <Link to={"/todos"}>
          <span className={styles.linkText}>Zurück zur Todos-Liste</span>
        </Link>
      </div>
    </div>
  );
};

export default TodoDetails;
