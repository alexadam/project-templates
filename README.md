# project-templates
Quick Project Templates

A build script (from ./build-scripts) creates a template project by combining
some configuration files (from ./config-files) and some source code files (from ./src-files). The resulting project template is stored in ./results

A build script is a combination of building parts. For example:

```
../parts-scripts/build.sh react-d3 addReact addD3
```

This creates a template project named *react-d3* with ~react~ (*addReact* part) and ~D3~ (*addD3* part).

*build.sh* combines all the building parts and creates the project template. It adds the respective source folders and config files and it also creates a *init.sh* script inside the resulting template folder. You must run this script to do the project's setup (for example installing packages with yarn)

A building part can be a script with specific commands or a simple text file. For example, ~init.sh~ initializes yarn and it is appended to the *init.sh* script.

The resulting project template should contain all the configuration files needed, the example source code and the *init.sh* initialization script. After executing *init.sh*, the result should be a ready to run project.

-------------------

```
Run a build script
    it calls -> build.sh + build parts
        creates -> project template
        assembles -> config files
                     source files
                     building parts / scripts -> are combined into init.sh

Then, in the project template folder, run  init.sh -> example project
```
