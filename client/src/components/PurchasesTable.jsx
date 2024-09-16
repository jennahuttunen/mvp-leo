import React, { useState, useEffect } from 'react';
import Table from "react-bootstrap/Table";
import { Modal, Button, Dropdown } from "react-bootstrap";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PurchasesTable = ({ purchases, deletePurchase, openEditModal, productionTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [sort, setSort] = useState('');
  const [displayPurchases, setDisplayPurchases] = useState(purchases);


  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleSortChange = (field) => {
    setSort(field);
  };

  useEffect(() => {
    let sortedPurchases = [...purchases];

    if (sort) {
      sortedPurchases = sortedPurchases.sort((a, b) => {
        if (sort === 'total-asc') {
          return parseFloat(a.total) - parseFloat(b.total);
        } else if (sort === 'total-desc') {
          return parseFloat(b.total) - parseFloat(a.total);
        } else if (sort === 'vendor-asc') {
          return a.vender.localeCompare(b.vender);
        } else if (sort === 'vendor-desc') {
          return b.vender.localeCompare(a.vender);
        } else if (sort === 'date-asc') {
          return new Date(a.date) - new Date(b.date);
        } else if (sort === 'date-desc') {
          return new Date(b.date) - new Date(a.date);
        }
        return 0;
      });
    }

    setDisplayPurchases(sortedPurchases);
  }, [sort, purchases]);

  const handleDeleteClick = (itemId) => {
    setCurrentId(itemId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deletePurchase(currentId);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    const paddingAboveTitle = 5; 
    const paddingBetweenTableAndTotal = 15; 
  

    doc.setFontSize(21); 
    doc.text(`Purchases for ${productionTitle}`, 10, 10 + paddingAboveTitle);
  

    doc.setFontSize(16);
  
    const tableColumn = ["Payment", "Date", "Order", "Vendor", "Items", "Description", "Total Cost", "Submitted", "Received"];
    const tableRows = [];
  
    displayPurchases.forEach((purchase) => {
      const { payment_type, date, order_num, vender, items, description, total, reimb_submitted, reimb_received } = purchase;
      const purchaseData = [
        payment_type,
        formatDate(date.slice(0, 10)),
        order_num,
        vender,
        items,
        description,
        `$${total}`,
        reimb_submitted ? "Yes" : "No",
        reimb_received ? "Yes" : "No"
      ];
      tableRows.push(purchaseData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20 + paddingAboveTitle, 
      headStyles: {
        fillColor: '#f9d234',
        textColor: '#000000'
      },
      styles: {
        cellPadding: 2
      },
      columnStyles: {
        5: { cellWidth: 25 },  
        6: { cellWidth: 25 },  
      },
    });
  
    const totalAmountY = doc.lastAutoTable.finalY + paddingBetweenTableAndTotal;
    const totalAmount = displayPurchases.reduce((acc, curr) => acc + parseFloat(curr.total), 0).toFixed(2);
    doc.text(`Total Amount: $${totalAmount}`, 10, totalAmountY);
  
    doc.save(`${productionTitle}_Purchases.pdf`);
  };  

  return (
    <div id="purchases-section">
      <h2>Purchases</h2>
      
      <div className="filter-sort">
        <div className="dropdown-wrapper">
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange('vendor-asc')}>Vendor: A-Z</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('vendor-desc')}>Vendor: Z-A</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('total-asc')}>Cost: Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('total-desc')}>Cost: Descending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('date-asc')}>Date: Ascending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('date-desc')}>Date: Descending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Table striped id="purchases-table">
        <thead className="purchases-column">
          <tr>
            <th>Payment</th>
            <th>Date</th>
            <th>Order</th>
            <th>Vendor</th>
            <th>Items</th>
            <th>Description</th>
            <th>Total Cost</th>
            <th>Submitted</th>
            <th>Received</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayPurchases.map((pur) => {
            const {id, vender, date, order_num, description, payment_type, items, total, reimb_submitted, reimb_received} = pur;

            return (
              <tr key={id}>
                <td>{payment_type}</td>
                <td>{formatDate(date.slice(0, 10))}</td>
                <td>{order_num}</td>
                <td>{vender}</td>
                <td>{items}</td>
                <td>{description}</td>
                <td>${total}</td>
                <td>{reimb_submitted ? "Yes" : "No"}</td>
                <td>{reimb_received ? "Yes" : "No"}</td>
                <td>
                  <div className="action-buttons">
                    <button type="button" onClick={() => openEditModal(pur)} className="btn btn-secondary btn-sm">Edit</button>
                    <span>&nbsp;</span>
                    <button type="button" onClick={() => handleDeleteClick(id)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <section id="pdf-section" className="pdf-section">
        <h3>Download</h3>
        <Button variant="warning" onClick={generatePDF} className="mt-5">
          Generate PDF
        </Button>
      </section>

      <Modal show={showModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="warning" onClick={confirmDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PurchasesTable;
