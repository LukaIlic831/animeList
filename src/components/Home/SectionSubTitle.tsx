import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { filter } from "../../data";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { updatePage } from "../../store/features/animeList.reducer";
import { AppContext } from "../../App";
import { IAppContext } from "../../types";
import { motion } from "framer-motion";

interface ISectionSubTitleProps {
  subTitle: string;
}

const subTitleVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 2,
    },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const filterVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  }
};

var changedFilter = filter;

const SectionSubTitle: React.FunctionComponent<ISectionSubTitleProps> = (
  props
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { setFilterChangedSkel, setFilterText, filterText } = React.useContext(
    AppContext
  ) as IAppContext;
  const [isFilterOpened, setIsFilterOpened] = React.useState<boolean>(false);
  const filterRef = React.useRef<HTMLDivElement | null>(null);

  const changeFilter = (name: string): void => {
    setFilterText(name);
    setFilterChangedSkel(true);
    dispatch(updatePage({ filterChanged: true }));
    changedFilter = filter.filter((item) => item.name !== name);
  };

  const removeFilter = () => {
    setFilterText("Filter by Type");
    changedFilter = filter;
    dispatch(updatePage({ filterChanged: true }));
  };

  React.useEffect(() => {
    window.addEventListener("mouseup", (event) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpened(false);
      }
    });
  }, []);

  return (
    <motion.div
      variants={subTitleVariants}
      animate="animate"
      initial="initial"
      className="section__sub-title--wrapper"
    >
      <motion.h2>{props.subTitle}</motion.h2>
      {props.subTitle === "Top Anime" && (
        <motion.div
          className="filter"
          ref={filterRef}
          style={
            isFilterOpened
              ? { border: "2px solid #2563eb" }
              : { border: "2px solid white" }
          }
        >
          <div className="filter__text">
            <span>{filterText}</span>
          </div>
          <ul className="filter__options">
            {filterText !== "Filter by Type" && (
              <li
                className="filter__options--option"
                onClick={() => removeFilter()}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="filter__options--option-icon"
                />
              </li>
            )}
            <li className="filter__options--option">
              <FontAwesomeIcon
                style={{
                  paddingTop: 2,
                  pointerEvents: isFilterOpened ? "none" : "auto",
                }}
                icon={faAngleDown}
                onClick={() => setIsFilterOpened(true)}
                className="filter__options--option-icon"
              />
            </li>
          </ul>
          {isFilterOpened && (
            <motion.ul
              variants={filterVariants}
              className="filter__names"
            >
              {changedFilter.map((item) => (
                <li
                  className="filter__names--name"
                  key={item.id}
                  onClick={() => changeFilter(item.name)}
                >
                  <p>{item.name}</p>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SectionSubTitle;
