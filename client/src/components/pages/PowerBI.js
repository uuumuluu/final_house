import React from 'react'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

// 도봉구 샘플
function PowerBI() {
  return (
    <div>
      <PowerBIEmbed
        embedConfig={{
          type: 'report', // 보고서 타입
          id: '64847c3f-9d8c-43ee-8c69-e7bc8d46a8d0', // CCTV 파일
          embedUrl: "https://app.powerbi.com/reportEmbed?reportId=64847c3f-9d8c-43ee-8c69-e7bc8d46a8d0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUVBU1QtQVNJQS1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
          accessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSIsImtpZCI6IjlHbW55RlBraGMzaE91UjIybXZTdmduTG83WSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZmQwOWIyYmMtOTIyMC00YzZiLTgzNzItMjIwYjdiZDUxODE5LyIsImlhdCI6MTY5ODMxMTQ5OSwibmJmIjoxNjk4MzExNDk5LCJleHAiOjE2OTgzMTU0NDUsImFjY3QiOjAsImFjciI6IjEiLCJhZ2VHcm91cCI6IjQiLCJhaW8iOiJBVFFBeS84VUFBQUFRVGdKNHFIRzl5eHJWdUhNVWFPSExYWkV2QmUyK3RkOElQYm40anNMQkNHQVdaWFJMTVFkNnBvOTEvSUIzUGtSIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2ltIiwiZ2l2ZW5fbmFtZSI6IkppaG8iLCJpcGFkZHIiOiIyMjEuMTU0LjI0LjgxIiwibmFtZSI6IktpbUppaG8iLCJvaWQiOiIxYzc0NjdhNC0xYjMyLTRiMjUtYTZiMS0wNjUxNTg4ZTUwM2EiLCJwdWlkIjoiMTAwMzIwMDA0OTAzNkM2RiIsInB3ZF9leHAiOiIyNjM1MDciLCJwd2RfdXJsIjoiaHR0cHM6Ly9wb3J0YWwubWljcm9zb2Z0b25saW5lLmNvbS9DaGFuZ2VQYXNzd29yZC5hc3B4IiwicmgiOiIwLkFYRUF2TElKX1NDU2EweURjaUlMZTlVWUdRa0FBQUFBQUFBQXdBQUFBQUFBQUFCeEFNVS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJwVnc3ZUdxbWFvY1RxWXlfRlF0YWFlSWdvd0M4c1lKVTJvRFB0MjBVdVZrIiwidGlkIjoiZmQwOWIyYmMtOTIyMC00YzZiLTgzNzItMjIwYjdiZDUxODE5IiwidW5pcXVlX25hbWUiOiJrb25nODhAZHVrc3VuZy5hYy5rciIsInVwbiI6Imtvbmc4OEBkdWtzdW5nLmFjLmtyIiwidXRpIjoiZ0xocjFvWmtkVXVRMHR3cmliVlhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19wbCI6ImtvLUtSIn0.LM7AeZMgG7K66LrJRHRY3Z_wQtZydHhfsJ7NhY2qy-p04C7cBJ2zCTnYK4e7JIuL0qsSDnYiAHhv3P57Wr2Vj8gDAzcaEv24TbWHdVL_EWJ6dj5qKYfFPHwfvI-3CffQAudzC0wK1mzd2lnBchVj2QHITME1wzffnWGQROxtuE0em4XdIuP9SP17RZboNeS0XvZwEQC3lVsUSOzvUdTE6lFgTcZEbN7OFf6Mg7p1EsFKd0PAy-j3tsJpqPNFukHhBK6Yque3KjtZU5gvXhE9NyNfMNgPiDDVQwfgsFYFebGiSa62zz2aHfFWxUXbMuIGzGxACrnDmL-UEiT3u-BDQQ",
          tokenType: models.TokenType.Aad,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false
              }
            },
            background: models.BackgroundType.Transparent,
          }
        }}


      // eventHandlers={
      //   new Map([
      //     ['loaded', function () { console.log('Report loaded'); }],
      //     ['rendered', function () { console.log('Report rendered'); }],
      //     ['error', function (event) { console.log(event.detail); }],
      //     ['visualClicked', (event) => {
      //       const visualData = event.detail;
      //       console.log('Visual Clicked:', visualData)
      //     }],
      //     ['pageChanged', (event) => console.log(event)],
      //   ])
      // }

      cssClassName={"embededReport"}
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
      />
    </div>
  )
}

export default PowerBI