import React, { Fragment, useState } from "react";
import { ListBox, ItemBox, ShowBox } from "./components";
import styles from "./index.less";
import data from "./fackData";

const MoreChoice = () => {
  const [listBoxShow, setListBoxShow] = useState(false);
  const [choiceItem, setChoiceItem] = useState([]);
  const changeListBoxShow = () => {
    const flag = !listBoxShow;
    setListBoxShow(flag);
  };

  return (
    <Fragment>
      <div className={styles.MoreChoice} onClick={changeListBoxShow}>
        <ShowBox />
        {listBoxShow && (
          <div className={styles.ListBox_Wrapper}>
            <ListBox
              data={data}
              choiceItem={choiceItem}
              setChoiceItem={setChoiceItem}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default MoreChoice;
