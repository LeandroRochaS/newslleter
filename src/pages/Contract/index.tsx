import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import "./styles.scss";
import { carregarSetoresLocalStorage } from "../../utils/data";
import { Etapa, Event, SectorType } from "../../utils/types";
import SearchInput from "../../components/SearchInput";
import { useNavigate, useParams } from "react-router-dom";
import chekF from "../../images/svg/checkF.svg";
import ButtonContact from "../../components/ButtonContact";

type SmsDemandStatusProps = {
  demand: Etapa;
  setorData: SectorType;
  setor: string;
};

export default function Contract() {
  const { userDataAuthContext, verifyLogged } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [, setUser] = useState<any>();
  const [data, setData] = useState<SectorType>();
  const [events, setEvents] = useState<Event[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [demand, setDemand] = useState<Etapa>();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [, setSetor] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    verifyLogged();
    setUser(userDataAuthContext);
    console.log("Entrou na página de setor");
    const sectorLower = userDataAuthContext?.nome.toLowerCase();
    let sectorFormt;
    if (
      sectorLower == "sop/sms" ||
      sectorLower == "sop/also" ||
      sectorLower == "gstd/enpi"
    ) {
      sectorFormt = sectorLower.replace("/", "");
    } else {
      sectorFormt = sectorLower;
    }
    setSetor(sectorFormt);
    console.log(sectorFormt);

    const setores = carregarSetoresLocalStorage();
    for (let i = 0; i < Object.keys(setores).length; i++) {
      const setor = setores[Object.keys(setores)[i]];
      for (
        let j = 0;
        j < Object.keys(setores[Object.keys(setores)[i]]).length;
        j++
      ) {
        const contratosSetor = Object.keys(setor);
        contratosSetor.map((contrato) => {
          if (contrato == id) {
            setData(setor[contrato]);
            if (userDataAuthContext.nome != "cont") {
              if (setor[contrato].sector != userDataAuthContext.nome) {
                handleBack();
              }
            }

            setDemand(setor[contrato].etapas[0]);
            setEvents(setor[contrato].etapas);
          }
        });
      }
    }
  }, [id, userDataAuthContext, verifyLogged]);

  return (
    <>
      <Header />
      <section className="container">
        <div className="timelineContainer">
          <div className="progress-container">
            <div className="progress-bar"></div>
          </div>
          <Timeline events={events} />
        </div>
        <div>
          <SearchInput />
        </div>
        <div>
          <SmsDemandStatus demand={demand} setorData={data} setor={""} />
        </div>
      </section>
      <ButtonContact />
    </>
  );
}

const TimelineEvent = ({ event }: { event: Event }) => {
  return (
    <li className="timeline-event">
      <span className="data">{event.data}</span>
      <p
        className="circle"
        style={{ backgroundColor: event.person ? "#080" : "#000" }}
      >
        <img className="icon-2" src={chekF} />
      </p>
      <div className="description-bar">
        <span className="title">{event.title}</span>
        <span className="person">{event.person}</span>
      </div>
    </li>
  );
};

const Timeline = ({ events }: { events: Event[] }) => {
  return (
    <ul className="timeline">
      {events.map((event, index) => (
        <TimelineEvent key={index} event={event} />
      ))}
    </ul>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SmsDemandStatus = ({ demand, setorData }: SmsDemandStatusProps) => {
  return (
    <>
      {demand && (
        <div>
          <div className="sms-demand-status">
            <div className="left-card w-50">
              <div className="flex-center title-container">
                <h3 className="demand-title">
                  {setorData.title}({setorData.sector.toLocaleUpperCase()})
                </h3>
              </div>
              <p className="demand-description">{setorData.description}</p>
              <p className="demand-details">
                DATA: <span className="detail-data">{setorData.date}</span>
              </p>
              <p className="demand-details">
                HORÁRIO: <span className="detail-time">{setorData.hour}</span>
              </p>
            </div>
            <div className="right-card w-50 ">
              <img src={setorData.image}></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
