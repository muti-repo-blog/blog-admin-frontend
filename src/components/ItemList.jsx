import { useState } from "react";
import "../css/posts.css"
import "../css/itemList.css"
import "../css/dropdown.css"
import Dropdown from "./dropdown";

const ItemList = (props) => {
  const [dotsClicked, setDotsClicked] = useState(false);

  const handleListItemDelete = async (id) => {
    await props.deleteListItem(id)
    props.setListItemObj(!props.listItemObj)
  }

  const handleBlur = (e) => {
    const related = e.relatedTarget;
    if (related && e.currentTarget.contains(related)) return;
    setDotsClicked(false);
  };

  return (
    <div
      className={props.index % 2 === 0 ? "listItem even" : "listItem odd"}
    >
      <h3>{props.item.title}</h3>
      <div
        onFocus={() => setDotsClicked(true)}
        onBlur={handleBlur}
        onMouseEnter={() => setDotsClicked(true)}
        onMouseLeave={() => setDotsClicked(false)}
      >
        <img
          tabIndex={0}
          className="moreOptions"
          src="/assets/more.svg"
          alt="More options"
        />

        {dotsClicked && (
          <Dropdown
            links={props.dropdownLinks}
            item={props.item}
            handleListItemDelete={handleListItemDelete}
            hasDelete={true}
          />
        )}

      </div>
    </div>
  );
};

export default ItemList