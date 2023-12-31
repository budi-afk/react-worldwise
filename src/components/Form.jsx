// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "../contexts/BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const [cityError, setCityError] = useState("");

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoadingPosition(true);
          setCityError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.city)
            throw new Error("Please click on the city on the Map!");

          setCityName(data.city || data.locality || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setCityError(err.message);
        } finally {
          setIsLoadingPosition(false);
        }
      }
      fetchData();
    },
    [lat, lng]
  );

  if (isLoadingPosition) return <Spinner />;

  if (cityError) return <Message message={cityError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
