export interface Contacto{
    id: number;
    tipoDeContacto: 'Persona' | 'Organización Pública' | 'Organización Privada';
    nombre: string;
    telefono: string;
    comentarios: string;
    camposAdicionales?: string;
}