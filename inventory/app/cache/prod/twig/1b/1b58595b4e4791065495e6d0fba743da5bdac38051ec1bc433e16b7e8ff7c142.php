<?php

/* @Framework/Form/radio_widget.html.php */
class __TwigTemplate_f10e1a4048ef4d77403cb669e83c029b1c18615a340199ac5931c53e035a22ff extends Twig_Template
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
        $__internal_e899f2d24c25699cb8b3ae3ebda210ad34d7b8482ef013bb84206bd755549ff8 = $this->env->getExtension("native_profiler");
        $__internal_e899f2d24c25699cb8b3ae3ebda210ad34d7b8482ef013bb84206bd755549ff8->enter($__internal_e899f2d24c25699cb8b3ae3ebda210ad34d7b8482ef013bb84206bd755549ff8_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/radio_widget.html.php"));

        // line 1
        echo "<input type=\"radio\"
    <?php echo \$view['form']->block(\$form, 'widget_attributes') ?>
    value=\"<?php echo \$view->escape(\$value) ?>\"
    <?php if (\$checked): ?> checked=\"checked\"<?php endif ?>
/>
";
        
        $__internal_e899f2d24c25699cb8b3ae3ebda210ad34d7b8482ef013bb84206bd755549ff8->leave($__internal_e899f2d24c25699cb8b3ae3ebda210ad34d7b8482ef013bb84206bd755549ff8_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/radio_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="radio"*/
/*     <?php echo $view['form']->block($form, 'widget_attributes') ?>*/
/*     value="<?php echo $view->escape($value) ?>"*/
/*     <?php if ($checked): ?> checked="checked"<?php endif ?>*/
/* />*/
/* */
