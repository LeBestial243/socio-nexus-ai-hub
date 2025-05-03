
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  FolderOpen, 
  Clock, 
  File
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types pour les documents
interface Document {
  id: string;
  name: string;
  category: string;
  type: "pdf" | "docx" | "image" | "other";
  size: string;
  lastModified: string;
  status: "Validé" | "En attente" | "Brouillon";
  author: string;
}

// Données fictives
const documents: Document[] = [
  {
    id: "1",
    name: "Rapport éducatif - Mai 2025",
    category: "Rapports",
    type: "pdf",
    size: "1.2 MB",
    lastModified: "02/05/2025",
    status: "Validé",
    author: "Admin"
  },
  {
    id: "2",
    name: "Suivi psychologique - Alexandre",
    category: "Notes",
    type: "docx",
    size: "458 KB",
    lastModified: "01/05/2025",
    status: "En attente",
    author: "Admin"
  },
  {
    id: "3",
    name: "Projet Personnalisé - Léa Martin",
    category: "Projets",
    type: "pdf",
    size: "2.4 MB",
    lastModified: "28/04/2025",
    status: "Validé",
    author: "Admin"
  },
  {
    id: "4",
    name: "Compte-rendu réunion d'équipe",
    category: "Comptes-rendus",
    type: "docx",
    size: "350 KB",
    lastModified: "27/04/2025",
    status: "Validé",
    author: "Admin"
  },
  {
    id: "5",
    name: "Autorisation parentale - Thomas",
    category: "Documents administratifs",
    type: "pdf",
    size: "780 KB",
    lastModified: "25/04/2025",
    status: "Validé",
    author: "Admin"
  },
  {
    id: "6",
    name: "Brouillon incident critique - Sophie",
    category: "Incidents",
    type: "docx",
    size: "520 KB",
    lastModified: "23/04/2025",
    status: "Brouillon",
    author: "Admin"
  }
];

// Fonction pour obtenir l'icône en fonction du type de fichier
const getFileIcon = (type: Document['type']) => {
  switch (type) {
    case 'pdf':
      return <FileText size={16} className="text-red-500" />;
    case 'docx':
      return <FileText size={16} className="text-blue-500" />;
    case 'image':
      return <FileText size={16} className="text-green-500" />;
    default:
      return <File size={16} className="text-gray-500" />;
  }
};

const Documents = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-gray-500">Gérez vos documents et classeurs numériques</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderOpen size={16} className="mr-2" /> Nouveau dossier
          </Button>
          <Button className="bg-socio-blue hover:bg-socio-blue/90">
            <Plus size={16} className="mr-2" /> Ajouter un document
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Rechercher un document..." className="pl-10" />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Nom</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Date de modification</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium flex items-center gap-2">
                    {getFileIcon(doc.type)}
                    <span>{doc.name}</span>
                  </TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Clock size={14} className="text-gray-400" />
                    {doc.lastModified}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      doc.status === "Validé" 
                        ? "bg-green-50 text-green-700 border-green-200"
                        : doc.status === "En attente" 
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                    }>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Download size={16} className="text-gray-500" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} className="text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Supprimer</DropdownMenuItem>
                          <DropdownMenuItem>Partager</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Documents;
