import React,{ useState} from 'react';
import styles from './Articules.module.css';
import Articule from './Articule/Articule';
import Pagination from '../UI/Pagination/Pagination';
import initialArticule from '../../array';


export default function Articules() {
    const [posts, setPosts] = useState(initialArticule);



    return (
        <div className={styles.ArticulesContainner}>
            <div className={styles.ArticulesRow}>
                {/* {posts.map(articule=><Articule key={articule.id} {...articule} />)} */}
                {posts.length > 0 ? (
          <Pagination
            data={posts}
            RenderComponent={Articule}
            title="Posts"
            pageLimit={posts.length/6}
            dataLimit={6}
          />
      ) : (
       <h1>No Posts to display</h1>
      )}
                
            </div>
        </div>
    )
}
