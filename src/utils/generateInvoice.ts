import jsPDF from "jspdf";
import { Product } from "@/types/product";

export const generateInvoicePDF = (items: Product[], userEmail: string) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Factura de Compra - E-Store UDB", 14, 20);

  doc.setFontSize(11);
  doc.text(`Cliente: ${userEmail}`, 14, 30);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 37);

  let y = 50;
  doc.setFontSize(10);
  doc.text("Producto", 14, y);
  doc.text("Cant.", 110, y);
  doc.text("Precio", 140, y);
  doc.text("Subtotal", 170, y);

  doc.line(14, y + 2, 195, y + 2);
  y += 10;

  let total = 0;
  items.forEach((item) => {
    const subtotal = item.price * (item.quantity || 1);
    total += subtotal;

    doc.text(item.title.substring(0, 35), 14, y);
    doc.text(String(item.quantity || 1), 110, y);
    doc.text(`$${item.price.toFixed(2)}`, 140, y);
    doc.text(`$${subtotal.toFixed(2)}`, 170, y);
    y += 8;
  });

  doc.line(14, y, 195, y);
  doc.setFontSize(12);
  doc.text(`Total Cancelado: $${total.toFixed(2)}`, 130, y + 10);

  doc.save(`factura_${Date.now()}.pdf`);
};