#!/bin/sh
set -e

# מחכה שה-TiDB יהיה מוכן
echo "Waiting for TiDB to be ready..."
until nc -z tidb 4000; do
  sleep 2
done
echo "TiDB is ready."

# יוצרת changefeed ל-Kafka
echo "Creating changefeed to Kafka..."
ticdc changefeed create \
  --pd=http://pd:2379 \
  --sink-uri="kafka://kafka:9092/test_topic?protocol=default" \
  --changefeed-id=home_test_cf || true

echo "TiCDC setup completed."
