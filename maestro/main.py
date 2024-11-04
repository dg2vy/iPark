from handler import create_app
from runner import *

if __name__ == '__main__':
    # create_app().run(host='0.0.0.0', port=9000)
    print(get_unused_port())