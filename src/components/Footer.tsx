import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";

import footerImg from "../assets/footerImg.png";

function Footer() {
  return (
    <footer className="bg-[#294E98]/70 text-gray-50 py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-10 md:px-0 gap-10">
        <img
          src={footerImg}
          alt="Footer Img"
          className="w-[220px] object-contain"
        />
        <div className="flex flex-col gap-5 text-lg">
          <p>
            <span className="font-semibold">İletişim</span> <br />
            Adres: Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2
            Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
          </p>
          <p className="font-semibold">Email: bilgi@tesodev.com</p>
        </div>
        <div className="md:w-[700px] w-[300px]">
          <MapContainer
            center={[41.019289072449936, 28.890926639277517]}
            zoom={12}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[41.019289072449936, 28.890926639277517]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
