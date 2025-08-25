#!/bin/sh
set -e

# מחכה ש-TiDB יהיה מוכן
echo "Waiting for TiDB to be ready..."
until nc -z tidb 4000; do
  sleep 2
done
echo "TiDB is ready."

# יוצר Changefeed ל-Kafka
echo "Creating changefeed to Kafka..."
/cdc cli changefeed create \
  --pd=http://pd:2379 \
  --sink-uri="kafka://kafka:9092/test_topic?protocol=default" \
  --changefeed-id=home_test_cf || true

echo "TiCDC setup completed."