'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { RentComp, SaleComp } from '@/lib/types/models';
import { currency, percent } from '@/lib/utils';

export function CompsMap({ sales, rents }: { sales: SaleComp[]; rents: RentComp[] }) {
  return (
    <MapContainer center={[32.94, -96.75]} zoom={12} className="h-[420px] w-full rounded-2xl">
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {sales.map((comp) => (
        <Marker key={comp.id} position={[comp.lat, comp.lng]}>
          <Popup>
            <div className="space-y-1 text-sm">
              <div className="font-semibold">{comp.name}</div>
              <div>Sale Price: {currency(comp.salePrice)}</div>
              <div>PPU: {currency(comp.pricePerUnit)}</div>
              <div>Cap: {comp.capRate ? percent(comp.capRate) : 'N/A'}</div>
            </div>
          </Popup>
        </Marker>
      ))}
      {rents.map((comp) => (
        <Marker key={comp.id} position={[comp.lat, comp.lng]}>
          <Popup>
            <div className="space-y-1 text-sm">
              <div className="font-semibold">{comp.name}</div>
              <div>Avg Rent: {currency(comp.avgRent)}</div>
              <div>Rent/SF: {currency(comp.avgRentSf)}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
