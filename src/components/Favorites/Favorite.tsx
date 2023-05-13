import * as React from "react";
import { IAnime } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { removeFavorite } from "../../store/features/favorites.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

interface IFavoriteProps {
  anime: IAnime;
}

const Favorite: React.FunctionComponent<IFavoriteProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <div className="anime__block">
      <div className="anime">
        <figure className="anime__img">
          <img
            src={props.anime.images.jpg.large_image_url}
            onClick={() => navigate(`/anime/${props.anime.mal_id}`)}
          />
          <div className="anime__buttons">
            <button
              className="anime__buttons--button"
              onClick={() => dispatch(removeFavorite(props.anime.mal_id))}
            >
              <FontAwesomeIcon icon={faTrashCan} className="icon" />
              <p>Remove</p>
            </button>
          </div>
        </figure>
        <div className="anime__title">
          <p>{props.anime.title}</p>
        </div>
        <div className="anime__info">
          <span>
            {props.anime.season} · {props.anime.status}
          </span>
        </div>
        <ul className="anime__categories">
          {props.anime.genres.map((genre) => (
            <li className="anime__categories--category" key={genre.mal_id}>
              <span>{genre.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorite;
