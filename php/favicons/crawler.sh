#!/bin/sh
nohup php ./crawler.php > crawlerOutput.out 2> crawlerErr.err < /dev/null &