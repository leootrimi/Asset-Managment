import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SamplePDF = ({ userData, equipmentData }) => {
  return (
    <div style={{ padding: '20px' }}>
      {/* Sample Image */}
      <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc', marginBottom: '20px' }}>
        ex1
      </div>

      {/* Sample H1 */}
      <h1>FORMULARI I REGJISTRIMIT TË POSEDIMIT PERSONAL TË ASETEVE TË KOMPANISË</h1>

      {/* Sample Text */}
      <p>Të dhënat e të Punësuarit:</p>

      {/* User Profile Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Emri</strong></TableCell>
              <TableCell><strong>Mbiemri</strong></TableCell>
              <TableCell><strong>Nr.Personal</strong></TableCell>
              <TableCell><strong>Addresa e Banimit</strong></TableCell>
              <TableCell><strong>Pozita</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userData.name}</TableCell>
              <TableCell>{userData.surname}</TableCell>
              <TableCell>{userData.personal_no}</TableCell>
              <TableCell>{userData.address_1}</TableCell>
              <TableCell>{userData.position}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sample Text */}
      <p>Some additional sample text goes here.</p>

      {/* Equipment Table */}
      <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nr.</strong></TableCell>
              <TableCell><strong>Pershkrimi i Artikullit</strong></TableCell>
              <TableCell><strong>Nr.Tiketes</strong></TableCell>
              <TableCell><strong>Nr.Serik</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipmentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.description || 'Sample Description'}</TableCell>
                <TableCell>{item.ticket_no || 'Sample Ticket No'}</TableCell>
                <TableCell>{item.serial_no || 'Sample Serial No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sample Text */}
      <p>Nënshkrimi i të Punësuarit:</p>

      {/* Another Table with Sample Name */}
      <TableContainer component={Paper} style={{ margin: '20px 0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Emri i Zyrtarit të Kompanisë</strong></TableCell>
              <TableCell><strong>Mjellma Zhuri </strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Kompania/Punëdhënësi</TableCell>
              <TableCell>Matrics Blockchain Sh.P.K</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nënshkrimi dhe data</TableCell>
              <TableCell>shembull1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Sample Text at the end */}
      <p>This is a sample text near the bottom of the page.</p>

      {/* Empty Div for Long Paragraph */}
      <div style={{ border: '1px solid #ccc', height: '150px', padding: '10px', marginTop: '20px' }}>
         I Punësuari me nënshkrimin e këtij formulari është i njoftuar që aseti që i është dhënë në posedim duhet të dorëzohet tek Punëdhënësi me rastin e përfundimit të marrëdhënies së punës. Ky dokument nuk përbën asnjë bazë për fitimin e pronësisë mbi asetin që i është dhënë në posedim të Punësuarit dhe se çdo përvetësim i asetit nga ana e të Punësuarit pa pëlqimin e Punëdhënësit konsiderohet si përvetësim i kundërligjshëm. Aseti i dhënë në posedim është pronë e Kompanisë dhe në çdo kohë me rastin e kërkimit për kthim apo përfundimit të marrëdhënies së punës, i Punësuari posedues duhet ta dorëzojë asetin tek personi i autorizuar pranë Punëdhënësit.
      </div>
    </div>
  );
};

export default SamplePDF;
