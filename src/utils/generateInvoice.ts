import jsPDF from "jspdf";
import { Product } from "@/types/product";

export const generateInvoicePDF = (items: Product[], userEmail: string) => {
  const doc = new jsPDF();

  // Encabezado con Banner Azul
  doc.setFillColor(37, 99, 235); // Azul primario
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("COMPROBANTE DE COMPRA", 14, 22);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("E-Store UDB", 160, 22);

  // Información de la transacción
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Detalles del Cliente:", 14, 48);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Correo electrónico: ${userEmail}`, 14, 55);
  doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 61);

  // Encabezado de Tabla
  let y = 75;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y - 5, 182, 9, "F");

  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "bold");
  doc.text("Producto", 18, y);
  doc.text("Cant.", 115, y);
  doc.text("Precio Unit.", 140, y);
  doc.text("Subtotal", 175, y);

  doc.setDrawColor(203, 213, 225);
  doc.line(14, y + 3, 196, y + 3);

  // Listado de Productos
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);

  let total = 0;
  items.forEach((item) => {
    const subtotal = item.price * (item.quantity || 1);
    total += subtotal;

    doc.text(item.title.substring(0, 35), 18, y);
    doc.text(String(item.quantity || 1), 118, y);
    doc.text(`$${item.price.toFixed(2)}`, 140, y);
    doc.text(`$${subtotal.toFixed(2)}`, 175, y);
    
    y += 8;
  });

  // Línea de Cierre y Total
  doc.line(14, y, 196, y);
  y += 12;

  doc.setFillColor(239, 246, 255);
  doc.rect(120, y - 6, 76, 14, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(29, 78, 216);
  doc.text(`Total Cancelado: $${total.toFixed(2)}`, 125, y + 3);

  // Pie de Página
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text("Gracias por tu compra en E-Store UDB.", 14, 280);

  doc.save(`factura_UDB_${Date.now()}.pdf`);
};