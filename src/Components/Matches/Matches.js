import { useEffect, useState } from "react";
import styles from "./Matches.module.css";
import LastMatch from "../Matches/LastMatch/LastMatch";
import Match from "../Matches/Match/Match";
import NextMatch from "./NextMatch/NextMatch";
import axios from "axios";
import LoadingIcon from "../UI/LoadingIcon/LoadingIcon";

export default function Matches() {
  const [matchesArr, setMatchesArr] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const test = async () => {
    const res = await axios.get("http://localhost:3001/api/getThreeMatches");
    setMatchesArr(res.data.matchesArr);
    setIsLoading(false);
  };
  useEffect(() => {
    test();
  }, []);

  return (
    <div className={styles.MatchesContainer}>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <LastMatch match={matchesArr[0]} />
          <Match match={matchesArr[1]} />
          <NextMatch match={matchesArr[2]} />
        </>
      )}
    </div>
  );
}
