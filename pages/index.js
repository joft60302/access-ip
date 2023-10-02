import React, { useEffect, useState } from 'react';

function Index() {
  const [ipAddress, setIpAddress] = useState(null);
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึง IP address', error);
      }
    };

    getIpAddress();
  }, []);

  useEffect(() => {
    if (ipAddress) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch(`http://ip-api.com/json/${ipAddress}`, requestOptions)
        .then(response => response.json())
        .then(result => setIpInfo(result))
        .catch(error => console.log('error', error));
    }
  }, [ipAddress]);

  return (
    <div style={{ p: 2 }}>
      <h1>IP Address ของคุณคือ:</h1>
      <p>{ipAddress}</p>
      {ipInfo && (
        <div>
          <h2>ข้อมูล IP Address:</h2>
          <ul>
            <li>ประเทศ: {ipInfo.country}</li>
            <li>รหัสประเทศ: {ipInfo.countryCode}</li>
            <li>เขต: {ipInfo.regionName}</li>
            <li>เมือง: {ipInfo.city}</li>
            <li>รหัสไปรษณีย์: {ipInfo.zip}</li>
            <li>ละติจูด: {ipInfo.lat}</li>
            <li>ลองจิจูด: {ipInfo.lon}</li>
            <li>โซนเวลา: {ipInfo.timezone}</li>
            <li>ISP: {ipInfo.isp}</li>
            <li>AS: {ipInfo.as}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Index;
