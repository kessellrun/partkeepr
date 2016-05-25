<?php

/* SpriteGeneratorBundle::plainCss.html.twig */
class __TwigTemplate_e901297af45a0d06cf261007153c15b04aa65ea45edbac1cfd683a950ffa9260 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_3346bbb337af2038de940673003ba408ba20b5fc68ddab3e039801f57243b7a5 = $this->env->getExtension("native_profiler");
        $__internal_3346bbb337af2038de940673003ba408ba20b5fc68ddab3e039801f57243b7a5->enter($__internal_3346bbb337af2038de940673003ba408ba20b5fc68ddab3e039801f57243b7a5_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "SpriteGeneratorBundle::plainCss.html.twig"));

        // line 1
        echo "
.";
        // line 2
        echo twig_escape_filter($this->env, (isset($context["spriteClass"]) ? $context["spriteClass"] : null), "html", null, true);
        echo " {
    background: url(";
        // line 3
        echo twig_escape_filter($this->env, (isset($context["spriteImageName"]) ? $context["spriteImageName"] : null), "html", null, true);
        echo ") no-repeat;
}

";
        // line 6
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["images"]) ? $context["images"] : null));
        foreach ($context['_seq'] as $context["key"] => $context["image"]) {
            // line 7
            echo ".";
            echo twig_escape_filter($this->env, $context["key"], "html", null, true);
            echo " {
    width: ";
            // line 8
            echo twig_escape_filter($this->env, $this->getAttribute($context["image"], "width", array()), "html", null, true);
            echo "px;
    height: ";
            // line 9
            echo twig_escape_filter($this->env, $this->getAttribute($context["image"], "height", array()), "html", null, true);
            echo "px;
    background-position: -";
            // line 10
            echo twig_escape_filter($this->env, $this->getAttribute($context["image"], "pos_x", array()), "html", null, true);
            echo "px -";
            echo twig_escape_filter($this->env, $this->getAttribute($context["image"], "pos_y", array()), "html", null, true);
            echo "px;
}
";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['key'], $context['image'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        
        $__internal_3346bbb337af2038de940673003ba408ba20b5fc68ddab3e039801f57243b7a5->leave($__internal_3346bbb337af2038de940673003ba408ba20b5fc68ddab3e039801f57243b7a5_prof);

    }

    public function getTemplateName()
    {
        return "SpriteGeneratorBundle::plainCss.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  52 => 10,  48 => 9,  44 => 8,  39 => 7,  35 => 6,  29 => 3,  25 => 2,  22 => 1,);
    }
}
/* */
/* .{{ spriteClass }} {*/
/*     background: url({{ spriteImageName }}) no-repeat;*/
/* }*/
/* */
/* {% for key, image in images %}*/
/* .{{ key }} {*/
/*     width: {{ image.width }}px;*/
/*     height: {{ image.height }}px;*/
/*     background-position: -{{ image.pos_x }}px -{{ image.pos_y }}px;*/
/* }*/
/* {% endfor %}*/
/* */
