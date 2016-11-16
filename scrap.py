from bs4 import BeautifulSoup
import urllib

r = urllib.urlopen('http://m.gatech.edu/w/schedule/c/').read()
soup = BeautifulSoup(r)
print soup.prettify()[0:1000]