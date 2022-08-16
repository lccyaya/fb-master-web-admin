import React, { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { API_SPORT, APIFilter } from '@/api';
import { CheckOutlined } from '@ant-design/icons';

const Index = ({ onChange = () => {}, value, matchId, disabled = false }) => {
  const getMatchOdd = () => {
    return API_SPORT.get('scheme.match-odd', '', {
      match_id: matchId,
    }).then(APIFilter);
  };

  const getMatchOddRequest = useRequest(getMatchOdd, {
    manual: true,
  });
  useEffect(() => {
    if (matchId) {
      getMatchOddRequest.run();
    }
  }, [matchId]);
  return (
    <div style={{ marginTop: 6 }}>
      {disabled ? <div style={{ color: 'red' }}>* 推荐项不可更改</div> : null}
      {getMatchOddRequest.loading ? (
        <>loading</>
      ) : (
        <>
          <div>
            {getMatchOddRequest.data?.odds?.map((odd) => {
              return (
                <div>
                  <div>{odd.scheme_title}</div>
                  <div style={{ display: 'flex' }}>
                    {odd.odds.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            if (disabled) {
                              return;
                            }
                            onChange({
                              odd_scheme_id: odd.odd_scheme_id,
                              tag: item.tag,
                            });
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            margin: 8,
                            border: '1px solid #ccc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            background: disabled ? '#f9f9f9' : '#fff',
                          }}
                        >
                          <div>{item.title}</div>
                          <div>{item.odd}</div>
                          <div style={{ width: 20, height: 20 }}>
                            {value?.odd_scheme_id === odd.odd_scheme_id &&
                            value?.tag === item.tag ? (
                              <CheckOutlined
                                style={disabled ? { color: 'grey' } : { color: 'green' }}
                              />
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
