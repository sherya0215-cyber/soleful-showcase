import { MapPin } from 'lucide-react';

interface MapProps {
  className?: string;
}

const Map = ({ className = "" }: MapProps) => {
  // Static map placeholder - in production, integrate with Mapbox using VITE_MAPBOX_PUBLIC_TOKEN
  return (
    <div className={`relative bg-secondary rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-xl mb-2">ACCENDO Flagship Store</h3>
        <p className="text-muted-foreground text-sm mb-4">
          123 Fifth Avenue<br />
          New York, NY 10001
        </p>
        <a 
          href="https://maps.google.com/?q=123+Fifth+Avenue+New+York+NY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline"
        >
          Open in Google Maps →
        </a>
      </div>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  );
};

export default Map;
