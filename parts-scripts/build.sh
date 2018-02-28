########################################
#
# Usage: ./build.sh TARGET_NAME Add_Component_1 Add_Component_2 Add_Component_3 ...
#
########################################


########################################

function add_args
{
    string=""
    for a in "${@:2}" # Loop over arguments, skip the first one
    do
        if [[ "$a" == "addReact" ]]
        then
            string+=$addReact
        fi
        if [[ "$a" == "addRedux" ]]
        then
            string+=$addRedux
        fi
        if [[ "$a" == "addThree" ]]
        then
            string+=$addThree
        fi
        if [[ "$a" == "addD3" ]]
        then
            string+=$addD3
        fi
        string+=$'\n'
    done
    echo "$string"
}

########################################

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi

#create target directory
TARGET=$1 # the first argument
DEST_DIR=$TARGET
mkdir -p $DEST_DIR

# merge all scripts
clean=`cat $DIR/clean.sh`
init=`cat $DIR/init.sh`
addReact=`cat $DIR/add-react.sh`
addRedux=`cat $DIR/add-redux.sh`
addD3=`cat $DIR/add-d3.sh`
addThree=`cat $DIR/add-three.sh`
yarnDev=`cat $DIR/yarn-dev.sh`
scripts=`cat $DIR/scripts.sh`

# add the respective react libs
args="$(add_args "$@")"

cat <<EOT >> $DEST_DIR/init.sh
$clean

$init

$args

$yarnDev

$scripts
EOT

# copy config files
cp -R ../config-files/. $DEST_DIR/

# copy example source files
cp -R ../src-files/$TARGET/. $DEST_DIR/

chmod +x $DEST_DIR/init.sh
