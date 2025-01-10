import React, { useEffect, useState } from 'react';
import { Client, Databases, Query } from 'appwrite';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css'
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67792f2600013311bcc9');

const database = new Databases(client);

const Boy = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchResults = async () => {
    const response = await database.listDocuments('6779a6320039942a4d7c', '677f97aa0002f6d9402e',
        [Query.equal('category','boy')]
    );
    setCandidates(response.documents.sort((a, b) => b.votes - a.votes));
    console.log(response.documents);
    
  };

  useEffect(() => {
    fetchResults();

    const unsubscribe = client.subscribe(
      [`databases.6779a6320039942a4d7c.collections.677f97aa0002f6d9402e.documents`],
      (response) => {
        if (response.events.some((event) => event.includes('update'))) {
          fetchResults(); // Refetch data when an update event is received
        }
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
<main className="table" id="customers_table">
  <section className="table__header">
    <h2 style={{ margin: '0 auto' }}>2024-2025 UCSMGY Total Votes (Boys)</h2>
  </section>
  <section className="table__body">
    <table>
      {/* Table Header */}
      <thead>
        <tr style={{backgroundColor:'#fff4 !important' }}>
          <th style={{display:'table-cell'}}>Contestant No<img src="images/mobile-data.png" width={25} height={25} alt="" /></th>
          <th>Name <img src="images/mobile-data.png" width={25} height={25} alt="" /></th>
          <th>Height <img src="images/mobile-data.png" width={25} height={25} alt="" /></th>
          <th>Section <img src="images/mobile-data.png" width={25} height={25} alt="" /></th>
          <th>Total Votes <img src="images/mobile-data.png" width={25} height={25} alt="" /></th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody>
        <AnimatePresence>
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.$id}
              layout
              id='motiondiv'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              style={{ display: 'table-row' }} /* Make the div behave like a row */
            >
              <div style={{ display: 'table-cell' }} className='li'>No.{candidate.candidateId}</div>
              <div style={{ display: 'table-cell' }} className='li'><div><img src={`./images/${candidate.img}`} style={{width:'30px',height:'30px',borderRadius:'50%'}}/></div><div> {candidate.name}</div></div>
              <div style={{ display: 'table-cell' }} className='li'>{candidate.height}</div>
              <div style={{ display: 'table-cell' }} className='li'>section-{candidate.section}</div>
              <div style={{ display: 'table-cell' }} className={`li`}><p className={`candi-${candidate.candidateId}`}>{candidate.votes*2}</p></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </section>
</main>

  );
};

export default Boy;
